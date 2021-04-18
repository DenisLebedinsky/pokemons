import { MenuItem } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { Controller } from 'react-hook-form'

const SelectMU = ({ control, name, label, options }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl} variant='outlined'>
      <InputLabel id='select-label'>{label}</InputLabel>

      <Controller
        as={
          <Select label={label}>
            <MenuItem value=''>нет</MenuItem>
            {options.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.description}
              </MenuItem>
            ))}
          </Select>
        }
        name={name}
        control={control}
        defaultValue=''
      />
    </FormControl>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
  })
)

export default SelectMU
