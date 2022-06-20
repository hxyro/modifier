import { error, info } from '../utils'
import isbot from 'isbot'
import markup from '../markup/OgImage'

const { performance } = require('perf_hooks')

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
    const user = await model.user
      .findOneAndDelete({ name: user_name })
      .orFail()
      .exec()
    if (user) {
      res.json(info.Removed(user_name)).end()
    } else {
      res.json(error.DoesNotExist('user', user_name)).end()
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
      .orFail()
      .exec()
    console.log(user)
    res.json(user).end()
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
      .orFail()
      .exec()
    await model.user.findOneAndUpdate(
      { name: user_name },
      {
        $pull: {
          modifier: modifier._id,
        },
      }
    )
    res.json(modifier).end()
  } catch (e) {
    console.log(e)
    res.json(error.ServerError).end()
  }
}

const redirect = (model) => async (req, res) => {
  let startTime = performance.now()
  try {
    const { user_name, modifier_name } = req.params
    const modifier = await model.modifier
      .findOne({ user_name, modifier_name })
      .orFail()
      .exec()

    if (isbot(req.get('user-agent'))) {
      const { redirect_url, asset_url, title, description } = modifier
      res.send(
        markup(
          decodeURI(redirect_url),
          decodeURI(asset_url),
          title,
          description
        )
      )
    } else {
      res.redirect(decodeURI(modifier.redirect_url))
    }
  } catch (e) {
    console.log(e)
    res.redirect('/')
  }

  let endTime = performance.now()
  console.log(`Call to redirect took ${endTime - startTime} milliseconds`)
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
