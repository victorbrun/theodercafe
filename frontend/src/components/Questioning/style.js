import { makeStyles } from '@material-ui/core'
import colors from 'ui/colors'

const useStyle = makeStyles((theme) => {
  return {
    activateLive: {
      marginBottom: '24px',
    },
    optionContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    filterOption: {
      fontSize: '11px',
    },
    neutralVote: {
      color: colors.white,
    },
    upVote: {
      color: colors.theodoGreen,
    },
    downVote: {
      color: colors.red,
    },
    questioningContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      position: 'relative',
    },
    questioningContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingTop: '8px',
      alignItems: 'center',
    },
    asakaiSubtitle: {
      alignItems: 'flex-start',
      display: 'flex',
      fontSize: '14px',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
    },
    asakaiModeInfo: {
      fontSize: '11px',
      fontStyle: 'italic',
      textAlign: 'left',
    },
    asakaiNewSetButton: {
      color: colors.theodoGreen,
      cursor: 'pointer',
      fontSize: '12px',
      marginTop: '4px',
    },
    connect: {
      color: colors.theodoGreen,
      cursor: 'pointer',
    },
    email: {
      zIndex: 1,
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
        marginBottom: '16px',
      },
    },
    alterodo: {
      marginTop: '16px',
    },
  }
})

export default useStyle
