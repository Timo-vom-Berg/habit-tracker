import "./App.css";
import {  Button, Checkbox, createTheme, CssBaseline, Paper, Stack, styled, TextField, Theme, ThemeProvider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {  HabitColumns } from "./utils/utils";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";


const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e1ead',
      dark: '#b8b8ff',
    },
    secondary: {
      main: '#ce0b8e',
    },
    error: {
      main: '#f51103',
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


//Datenbank eines Habits
interface HabitData {
  id: number,
  name: string,
  goal: string
  completedHabits: boolean[]
}



function App() {
  //useState lässt uns unsere Box Interactive gestalten
  const [habits, setHabits] = useLocalStorage<HabitData[]>("habits", [])

  const [habitText, setHabitText] = useState('')
  const [goalText, setGoalText] = useState("")


  const handleClickCheckedBox = (id: number, weekDayIndex: number) => {

    const updatedHabits = [...habits]

    const idx = updatedHabits.findIndex(h => h.id === id)

    const oldVal = updatedHabits[idx].completedHabits[weekDayIndex]
    updatedHabits[idx].completedHabits[weekDayIndex] = !oldVal
    // toggel den boolean Wert
    setHabits(updatedHabits)
    //neu Zustand wird geupatet
  }

  const handleHabitTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setHabitText(val);
  }

  const handleGoalTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setGoalText(val);
  }

  const addHabit = () => {
    setHabits(habits => [...habits, {
      name: habitText,
      id: habits.length,
      completedHabits: Array(7).fill(false),
      goal: goalText,
    }])
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography textAlign='center' variant="h3" >
        Habit Tracker
      </Typography>

      <Grid mb='.5em' justifyContent="center" container spacing={2}>
        {HabitColumns.map((item) =>
          <Grid size={item.size} >
            <Item>{item.text}</Item>
          </Grid>
        )}
      </Grid>
      {
        habits.map((h) =>
          <Grid justifyContent="center" container spacing={1.56}>
            <Grid size={1} >
              <Item>
                {h.name}
              </Item>
            </Grid>
            {h.completedHabits.map((val, boxIndex) =>
              <Grid justifyContent='center' size={1} >
                <Checkbox
                  onClick={() => handleClickCheckedBox(h.id, boxIndex)}
                  checked={val}
                />
              </Grid>
            )}
            <Grid size={1} >
              <Item>
                {h.goal}
              </Item>
            </Grid>
          </Grid>
        )
      }
      <Stack justifyContent="center" direction="row" spacing={2}>
        <TextField value={habitText} onChange={handleHabitTextChange} placeholder="Add new Habit">
        </TextField>

        <TextField value={goalText} onChange={handleGoalTextChange} placeholder="Add new Goal">
        </TextField>

        {/* Copy paste das text field
        fuege einen neuen state hinzu mit useState Z.B 
        goalText, setGoalText
        aender den placeholder, und den value
        definiere eine handleGoalTextChange funktion, die den value updatet
        */}
        <Button onClick={addHabit} variant="contained">
          Add
        </Button>
      </Stack>





    </ThemeProvider>
  );
}

export default App;
