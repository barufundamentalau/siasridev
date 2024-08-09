import React, { useState, useEffect, useRef } from 'react'
import { Pie, Bar, Line } from 'react-chartjs-2'
import moment from 'moment'
import html2canvas from 'html2canvas'
import '../../helpers/chartConfig'
import Loading from '../../components/utilities/Loading'
// import Backend from '../../api/backend'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const getDateRange = (type) => {
  const today = moment().startOf('day')
  const yesterday = moment().subtract(1, 'day').startOf('day')

  switch (type) {
    case '1':
      return {
        tglAwal: today.format('YYYY-MM-DD'),
        tglAkhir: today.format('YYYY-MM-DD'),
      }
    case '2':
      return {
        tglAwal: today.startOf('month').format('YYYY-MM-DD'),
        tglAkhir: today.endOf('month').format('YYYY-MM-DD'),
      }
    case '3':
      return {
        tglAwal: today.startOf('year').format('YYYY-MM-DD'),
        tglAkhir: today.endOf('year').format('YYYY-MM-DD'),
      }
    case 'default':
      return {
        tglAwal: yesterday.format('YYYY-MM-DD'),
        tglAkhir: today.format('YYYY-MM-DD'),
      }
    default:
      return {
        tglAwal: yesterday.format('YYYY-MM-DD'),
        tglAkhir: today.format('YYYY-MM-DD'),
      }
  }
}

const Card10Kasus = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Kasus',
        data: [],
        backgroundColor: [],
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  })
  const [radioValue, setRadioValue] = useState('default')
  const [chartType, setChartType] = useState('Pie')
  const [loading, setLoading] = useState(true)
  const chartRef = useRef(null)

  const fetchData = async () => {
    const { tglAwal, tglAkhir } = getDateRange(radioValue)
    try {
      const response = await fetch(
        `https://apiasriv2.rsudkk.work/api/web/diagnosa/?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}`
      )

      // Log status dan respons
      console.log('Response Status:', response.status)
      const data = await response.json()
      console.log('Response Data:', data)

      // Akses array data dengan benar
      const diagnosaData = data.data.data

      // Cek jika data tidak kosong
      if (!Array.isArray(diagnosaData)) {
        console.error(
          'Data tidak sesuai, data.data.data bukan array',
          diagnosaData
        )
        return
      }

      const labels = diagnosaData.map((item) => item.DESKRIPSI)
      const values = diagnosaData.map((item) => parseInt(item.VALUE))

      const randomColors = labels.map(() => getRandomColor())

      const newChartData = {
        labels,
        datasets: [
          {
            label: 'Kasus',
            data: values,
            backgroundColor: randomColors,
            borderColor: '#000000',
            borderWidth: 1,
          },
        ],
      }

      setChartData(newChartData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [radioValue])

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
  }

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value)
  }

  const downloadChart = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'chart.png'
        link.click()
      })
    }
  }

  if (loading)
    return (
      <>
        <Loading />
      </>
    )

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          boxWidth: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.raw
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Deskripsi',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah',
        },
      },
    },
  }

  const totalValue =
    chartData.datasets?.[0]?.data.reduce((acc, value) => acc + value, 0) || 0

  return (
    <div className='container'>
      <div className='text-center mb-3'>
        <div className='btn-group mb-2'>
          <input
            type='radio'
            id='default'
            name='timePeriod'
            value='default'
            checked={radioValue === 'default'}
            onChange={handleRadioChange}
            className='btn-check'
          />
          <label htmlFor='default' className='btn btn-success'>
            Kemarin hingga Hari Ini
          </label>
          <input
            type='radio'
            id='today'
            name='timePeriod'
            value='1'
            checked={radioValue === '1'}
            onChange={handleRadioChange}
            className='btn-check'
          />
          <label htmlFor='today' className='btn btn-success'>
            Hari Ini
          </label>

          <input
            type='radio'
            id='month'
            name='timePeriod'
            value='2'
            checked={radioValue === '2'}
            onChange={handleRadioChange}
            className='btn-check'
          />
          <label htmlFor='month' className='btn btn-success'>
            Bulan Ini
          </label>

          <input
            type='radio'
            id='year'
            name='timePeriod'
            value='3'
            checked={radioValue === '3'}
            onChange={handleRadioChange}
            className='btn-check'
          />
          <label htmlFor='year' className='btn btn-success'>
            Tahun Ini
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12 mb-4'>
          <div className='card border-0 rounded shadow-sm'>
            <div className='card-body-grafik'>
              {chartData.labels.length === 0 ? (
                <p>Maaf, data tidak tersedia.</p>
              ) : (
                <>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th>Deskripsi</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.labels.map((label, index) => (
                        <tr key={index}>
                          <td>{label}</td>
                          <td>{chartData.datasets[0].data[index]}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>
                          <strong>{totalValue}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-12 mb-4'>
          <div className='card border-0 rounded shadow-sm'>
            <div className='card-body-grafik'>
              <div className='chart-container-grafik' ref={chartRef}>
                <h5 className='card-title-grafik'>{`${chartType} Chart`}</h5>
                {chartType === 'Pie' && (
                  <Pie data={chartData} options={chartOptions} />
                )}
                {chartType === 'Bar' && (
                  <Bar data={chartData} options={chartOptions} />
                )}
                {chartType === 'Line' && (
                  <Line data={chartData} options={chartOptions} />
                )}
              </div>
              <div className='ml-0-grafik ml-md-4-grafik d-flex flex-column border-left-grafik pl-0-grafik pl-md-3-grafik'>
                <h5 className='text-center mb-3'>Pilih Chart</h5>
                <select
                  value={chartType}
                  onChange={handleChartTypeChange}
                  className='form-select'
                >
                  <option value='Pie'>Pie Chart</option>
                  <option value='Bar'>Bar Chart</option>
                  <option value='Line'>Line Chart</option>
                </select>
                <button
                  onClick={downloadChart}
                  className='btn btn-success mt-3'
                >
                  Download Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card10Kasus
