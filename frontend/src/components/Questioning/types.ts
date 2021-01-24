type UserAlterodoResponse = {
  givenName: string
  familyName: string
  pictureUrl: string
}

export interface SimilarityWithUserId {
  userId: number
  commonQuestionCount: number
  sameAnswerCount: number
  similarity: number
}

export type Alterodos = {
  baseQuestionCount: number
  alterodo: SimilarityWithUserId & UserAlterodoResponse
  varieto: SimilarityWithUserId & UserAlterodoResponse
}

export type QuestionResponse = {
  categoryName?: string
  id: number
  isValidated: boolean
  option1: string
  option2: string
}

export type QuestioningAnswers = {
  choice1: number
  choice2: number
}

export type Choice = 1 | 2

export type AsakaiChoices = { [questionId: number]: Choice }