import { makeStyles } from '@material-ui/core/styles'
import PokemonList from 'src/components/PokemonList'

export default function Main() {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <PokemonList />
    </div>
  )
}

const useStyles = makeStyles({
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
})
