import { error, info } from '../utils/error'
import isbot from 'isbot'

const index = (_req, res) => {
  res.send('Homepage').end()
}

const createUser = (model) => async (req, res) => {
  const { user_name } = req.body
  try {
    const user = await model.user.create({ name: user_name })
    console.log(user)
    res.json(user).end()
  } catch (e) {
    console.log(e)
    res.json(error.NameTaken(user_name)).end()
  }
}

const deleteUser = (model) => async (req, res) => {
  const { user_name } = req.params
  try {
    const user = await model.user.findOneAndDelete({ name: user_name }).exec()
    if (user) {
      console.log(user)
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
    res.json({ error: 'user already exists' }).end()
  }
}

const createModifier = (model) => async (req, res) => {
  const { user_name, modifier_name } = req.params
  const { redirect_url, asset_url, title, description, clicks } = req.body

  try {
    // todo: use middleware for this shit
    const ismodifier = await model.modifier
      .findOne({ modifier_name, user_name })
      .exec()
    //
    if (!ismodifier) {
      try {
        const url_code = await model.modifier.create({
          user_name,
          modifier_name,
          redirect_url,
          asset_url,
          title,
          description,
          clicks,
        })
        const updated_user = await model.user.findOneAndUpdate(
          { name: user_name },
          {
            $addToSet: {
              modifier: url_code._id,
            },
          }
        )
        console.log(updated_user)
        console.log(url_code)
        res.json(url_code).end()
      } catch (e) {
        console.log(e)
      }
    } else {
      res.redirect('/')
    }
  } catch (e) {
    console.log(e)
    res.json({ error: 'user already exists' }).end()
  }
}

const deleteModifier = (model) => async (req, res) => {
  const { user_name, modifier_name } = req.params

  try {
    const url_code = await model.modifier
      .findOneAndDelete({ user_name, modifier_name })
      .exec()
    if (url_code) {
      const updated_user = await model.user.findOneAndUpdate(
        { name: user_name },
        {
          $pull: {
            modifier: url_code._id,
          },
        }
      )
      console.log(updated_user)
      console.log(url_code)
      res.json(url_code).end()
    } else {
      res.json(error.ModifierDoesNotExist(modifier_name))
    }
  } catch (e) {
    console.log(e)
    res.json({ error: 'user already exists' }).end()
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

export const controller = {
  index,
  createUser,
  deleteUser,
  getUser,
  createModifier,
  deleteModifier,
  redirect,
}
