import { error, info } from '../utils'
import isbot from 'isbot'

const index = (_req, res) => {
  res.send('Homepage').end()
}

const createUser = (model) => async (req, res) => {
  const { user_name } = req.body
  try {
    const user = await model.user.create({ name: user_name })
    res.json(user).end()
  } catch (e) {
    console.log(e)
  }
}

const deleteUser = (model) => async (req, res) => {
  const { user_name } = req.params
  try {
    const user = await model.user.findOneAndDelete({ name: user_name }).exec()
    if (user) {
      res.json(info.Removed(user_name)).end()
    } else {
      res.json(error.UserDoesNotExist(user_name)).end()
    }
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const getUser = (model) => async (req, res) => {
  const { user_name } = req.params
  try {
    const user = await model.user
      .findOne({ name: user_name })
      .populate('modifier')
      .exec()
    if (user) {
      console.log(user)
      res.json(user).end()
    } else {
      res.redirect('/')
    }
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const createModifier = (model) => async (req, res) => {
  const { user_name, modifier_name } = req.params
  const { redirect_url, asset_url, title, description } = req.body
  try {
    const modifier = await model.modifier.create({
      user_name,
      modifier_name,
      redirect_url,
      asset_url,
      title,
      description,
    })
    if (modifier) {
      await model.user.findOneAndUpdate(
        { name: user_name },
        {
          $addToSet: {
            modifier: modifier._id,
          },
        }
      )
    }
    res.json(modifier).end()
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const deleteModifier = (model) => async (req, res) => {
  const { user_name, modifier_name } = req.params

  try {
    const modifier = await model.modifier
      .findOneAndDelete({ user_name, modifier_name })
      .exec()
    if (modifier) {
      await model.user.findOneAndUpdate(
        { name: user_name },
        {
          $pull: {
            modifier: modifier._id,
          },
        }
      )
      res.json(modifier).end()
    } else {
      res.json(error.ModifierDoesNotExist(modifier_name))
    }
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const redirect = (model) => async (req, res) => {
  const { user_name, modifier_name } = req.params
  const modifier = await model.modifier
    .findOne({ user_name, modifier_name })
    .exec()
  if (modifier) {
    if (isbot(req.get('user-agent'))) {
      // TODO: Render template string
      res.send('BOT')
    } else {
      // TODO: get original url
      res.send('ehh')
    }
  } else {
    res.redirect('/')
  }
}

export default {
  index,
  createUser,
  deleteUser,
  getUser,
  createModifier,
  deleteModifier,
  redirect,
}
