import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverage} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="container">
      <h1 className="head">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={vaccinationCoverage}
          margin={{
            top: 5,
          }}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccinationDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
