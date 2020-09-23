import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => {
  return {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      position: 'relative',
    },
    toolbarSpace: {
      ...theme.mixins.toolbar,
    },
    questioningContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    addButton: {
      position: 'absolute',
      bottom: '15px',
      right: '0px',
    },
    modal: {
      padding: '30px',
    },
  }
})

export default useStyle
