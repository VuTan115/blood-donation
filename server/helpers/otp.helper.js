import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = twilio(accountSid, authToken)

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const sendSMS = async (phoneNumber, message) => {
  const { phoneNumber } = req.body
  return await twilioClient.messages.create({
    messagingServiceSid: messagingServiceSid,
    to: `+84${phoneNumber}`,
    body: message,
  })
}

const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body
  const code = getRandomNumberBetween(100000, 999999)
  const message = `Ma xac thuc GIOT HONG cua ban la: ${code}. Ma xac thuc nay co hieu luc trong vong 5 phut.`
  try {
    await sendSMS(phoneNumber, message)
    return res.status(200).send('SMS sent!')
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default {
  sendOTP,
}