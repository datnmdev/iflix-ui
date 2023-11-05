import ScheduleStatus from '../common/enums/ScheduleStatus'

interface ISchedule {
  _id: string,
  movie: string,
  schedules: number[],
  content: string,
  status: ScheduleStatus.UNRELEASED | ScheduleStatus.RELEASED | ScheduleStatus.DELAY
}

export default ISchedule