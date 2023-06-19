import response from '../libs/response'

export const handler = async (event, context) => {
  return response.success({
    message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!' }))}`
  })
}

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`)
  }, time * 1000)
)
