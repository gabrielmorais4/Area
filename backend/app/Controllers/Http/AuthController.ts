import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/User/AuthValidator'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.firstOrCreate(payload)

    const userToken = await auth.use('api').generate(user, {
      expiresIn: '7 days',
    })

    await Oauth.updateOrCreate(
      {
        userUuid: userToken.user.uuid,
        provider: 'timer',
      },
      {
        token: 'timer',
        refreshToken: 'timer',
      }
    )
    await Oauth.updateOrCreate(
      {
        userUuid: userToken.user.uuid,
        provider: 'crypto',
      },
      {
        token: 'crypto',
        refreshToken: 'crypto',
      }
    )

    return response.ok({
      message: 'User signed up successfully',
      token: userToken.token,
    })
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    return response.ok({
      user,
    })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()

    const { currentPassword, newPassword, ...payload } = await request.validate(UpdateValidator)

    try {
      if (currentPassword) {
        if (!newPassword) {
          return response.badRequest({
            message: 'New password is required',
          })
        }
        await auth.attempt(user.email, currentPassword)
      }
    } catch (error) {
      return response.badRequest({
        message: 'Current password is incorrect',
      })
    }

    user.merge({
      password: newPassword,
      ...payload,
    })
    await user.save()

    return response.ok({
      message: 'User updated successfully',
      user,
    })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    await auth.attempt(email, password)
    const user = await auth.authenticate()
    const userToken = await auth.use('api').generate(user, {
      expiresIn: '7 days',
    })

    return response.ok({
      message: 'User logged in successfully',
      token: userToken.token,
    })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.ok({
      message: 'User logged out successfully',
    })
  }

  public async checkIfEmailExists({ request, response }: HttpContextContract) {
    const { email } = request.body()

    if (!email) {
      return response.notAcceptable({
        message: 'Email is required',
      })
    }

    const user = await User.query().where('email', email).first()

    if (user) {
      return response.ok(true)
    }
    return response.ok(false)
  }

  public async getServices({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user) {
      return response.unauthorized({
        message: 'You must be logged in to access this resource',
      })
    }
    const services = await Oauth.query().where('userUuid', user.uuid).select('provider')
    return [
      {
        provider: 'timer',
      },
      {
        provider: 'crypto',
      },
      ...services,
    ]
  }
}
