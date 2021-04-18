import { CircularProgress, TablePagination } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import usePokemonList from 'src/components/PokemonList/usePokemonList'

export default function PokemonList() {
  const classes = useStyles()
  const {
    list,
    count,
    isLoading,
    error,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePokemonList()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return (
      <Typography variant='subtitle1' component='span' color={'error'}>
        Problem with load data!
      </Typography>
    )
  }

  if (!list) {
    return null
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell component='th' scope='row' className={classes.name}>
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
  },
  table: {
    width: '100%',
  },
  name: {
    textTransform: 'capitalize',
  },
})
