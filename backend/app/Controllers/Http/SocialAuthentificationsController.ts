import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, response }: HttpContextContract) {
    const service = ally.use(params.provider)

    if (service.accessDenied()) {
      return 'Access was denied'
    }

    if (service.stateMisMatch()) {
      return 'Request origin could not be verified'
    }

    if (service.hasError()) {
      return service.getError()
    }

    const user = await service.user()

    const { token, id } = user

    return response.ok({
      message: {
        token: token.token,
        refreshToken: token.refreshToken,
        oauthUserId: id,
        provider: params.provider,
      },
    })
  }
  public async save({ auth, response, request }: HttpContextContract) {
    const loggedUser = await auth.authenticate()

    if (!loggedUser) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }
    console.log(request['requestBody'], request.param('provider'))
    if (
      !request['requestBody'].token ||
      !request['requestBody'].refreshToken ||
      !request['requestBody'].oauthUserId
    ) {
      return response.badRequest({ message: 'Missing parameters' })
    }

    await Oauth.updateOrCreate(
      {
        userUuid: loggedUser.uuid,
        provider: request.param('provider'),
      },
      {
        token: request['requestBody'].token,
        refreshToken: request['requestBody'].refreshToken,
        oauthUserId: request['requestBody'].oauthUserId,
      }
    )
      .then((oauth) => {
        return response.ok({
          message: 'Oauth saved successfully',
          oauth,
        })
      })
      .catch((error) => {
        return response.badRequest({
          message: 'An error occured while saving the oauth',
          error,
        })
      })
  }
}
