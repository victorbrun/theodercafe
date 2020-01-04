import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { UserToQuestionChoice } from './userToQuestionChoice.entity';
import { SimilarityWithUserId } from './userToQuestionChoice.types';

const COMPANIES = ['theodo'];
if (process.env.NODE_ENV === 'development') {
    COMPANIES.push('gmail');
}

@EntityRepository(UserToQuestionChoice)
export class UserToQuestionChoiceRepository extends Repository<UserToQuestionChoice> {
    async findByQuestionIds(questionIds): Promise<UserToQuestionChoice[]> {
        return this.createQueryBuilder('user_to_question_choices')
            .leftJoin('user_to_question_choices.user', 'user')
            .where('user.company IN (:...companies)', { companies: COMPANIES })
            .andWhere('user_to_question_choices.questionId IN (:...questionIds)', { questionIds })
            .getMany();
    }

    async findByValidatedQuestions(): Promise<UserToQuestionChoice[]> {
        return await this.createQueryBuilder('user_to_question_choices')
            .leftJoin('user_to_question_choices.user', 'user')
            .where('user.company IN (:...companies)', { companies: COMPANIES })
            .leftJoin('user_to_question_choices.question', 'question')
            .where('question.isValidated = true')
            .getMany();
    }

    async getValidatedQuestionsCount(): Promise<{ count: number }> {
        return await this.createQueryBuilder('user_to_question_choices')
            .select('COUNT(DISTINCT "user_to_question_choices"."questionId")')
            .leftJoin('user_to_question_choices.user', 'user')
            .where('user.company IN (:...companies)', { companies: COMPANIES })
            .leftJoin('user_to_question_choices.question', 'question')
            .where('question.isValidated = true')
            .getRawOne();
    }

    async selectSimilarityWithUserIds(userId: number): Promise<SimilarityWithUserId[]> {
        return this.createQueryBuilder('user_to_question_choices')
            .select('user_to_question_choices.userId', 'userId')
            .addSelect('COUNT(*)', 'commonQuestionCount')
            .addSelect(
                'SUM(CASE WHEN user_to_question_choices.choice = "targetChoice" THEN 1 ELSE 0 END)',
                'sameAnswerCount',
            )
            .addSelect('0', 'similarity')
            .innerJoin(
                this.createBaseQuestionSelectionQuery(userId),
                'utqc',
                '"utqc"."questionId" = user_to_question_choices.questionId',
            )
            .leftJoin('user_to_question_choices.user', 'user')
            .where('user_to_question_choices.userId != :userId', { userId })
            .andWhere('user.company IN (:...companies)', { companies: COMPANIES })
            .groupBy('user_to_question_choices.userId')
            .getRawMany();
    }

    async countUserQuestionChoices(userId: number): Promise<number> {
        return this.createBaseQuestionSelectionQuery(userId)(this.createQueryBuilder()).getCount();
    }

    private createBaseQuestionSelectionQuery(
        userId: number,
    ): (query: SelectQueryBuilder<UserToQuestionChoice>) => SelectQueryBuilder<UserToQuestionChoice> {
        return (query: SelectQueryBuilder<UserToQuestionChoice>): SelectQueryBuilder<UserToQuestionChoice> => {
            return query
                .select('user_to_question_choices.questionId', 'questionId')
                .addSelect('user_to_question_choices.choice', 'targetChoice')
                .from(UserToQuestionChoice, 'user_to_question_choices')
                .leftJoin('user_to_question_choices.question', 'question')
                .where('user_to_question_choices.userId = :userId', { userId })
                .andWhere('question.isValidated = true');
        };
    }
}
