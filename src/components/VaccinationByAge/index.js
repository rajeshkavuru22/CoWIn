import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="container">
      <h1 className="head">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300} layout="vertical">
        <PieChart className="chart">
          <Pie
            cx="70%"
            cy="40%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
            verticalAlign="middle"
          >
            <Cell name="18-44" fill="#5a8dee" />
            <Cell name="44-60" fill="#cbd5e1" />
            <Cell name="Above 60" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
