import Volunteer from '../models/Volunteer.js'

const addVolunteer = async (req, res) => {
  try {
    let newVolunteer = new Volunteer({
      name: req.body.name,
      phone: req.body.phone_number,
      date_of_birth: req.body.birthday,
      address: req.body.address,
      email: req.body.email,
      organization_id: req.body.organization_id,
      gender: req.body.gender,
    })
    newVolunteer = await newVolunteer.save()
    return res.status(200).json(newVolunteer)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getVolunteers = async (_, res) => {
  try {
    const volunteers = await Volunteer.find()
    return res.status(200).json(volunteers)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params
    await Volunteer.findOneAndDelete({ _id: id })
    return res.status(200).json({})
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Volunteer.findOneAndUpdate({ _id: id }, req.body, { new: true })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const VolunteerController = {
  addVolunteer,
  getVolunteers,
  updateVolunteer,
  deleteVolunteer,
}
