export interface ColumnItem {
    text: string;
    size: number;
  }
  export const WEEKDAYS = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fr",
    "Sat",
    "Sun"
  ]
  
  const WeekColumns: ColumnItem[] = WEEKDAYS.map((day) => {
    return {
      text: day,
      size: 1
    }
  })
  
  
  export const HabitColumns: ColumnItem[] = [
    {
      size: 1,
      text: "Name"
    },
    ...WeekColumns,
    {
      size: 1,
      text: "Goal"
    }
  ]