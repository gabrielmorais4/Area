import axios from 'axios';
import { API_URL, Token, User } from '../constants';

export const verifyEmail = async (payload: {
  email: string;
}): Promise<boolean> => {
  try {
    return (await axios.post(API_URL + '/auth/register/verify/step/1', payload))
      .data;
  } catch (error) {
    throw new Error('Error verifying email.');
  }
};

export const logIn = async (payload: {
  email: string;
  password: string;
}): Promise<Token> => {
  try {
    return (await axios.post(API_URL + '/auth/login', payload)).data as Token;
  } catch (error) {
    throw new Error('Error logging in.');
  }
};

export const signUp = async (payload: {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}): Promise<Token> => {
  try {
    return (await axios.post(API_URL + '/auth/register', payload))
      .data as Token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422)
        throw new Error('Username already taken.');
    }
    throw new Error('Error signing up.');
  }
};

export const updateCredentials = async (payload: {
  email?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
  current_password?: string;
}): Promise<void> => {
  try {
    const filteredPayload: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(payload)) {
      if (value === '') {
        continue;
      }
      filteredPayload[key] = value;
    }
    return await axios.patch(API_URL + '/user/me/update', filteredPayload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        throw new Error(error.response?.data.message);
      throw new Error(error.response?.data.errors[0].message);
    }
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await axios.get(API_URL + '/user/me', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error getting user.');
  }
};

export const startOnboarding = async (): Promise<void> => {
  try {
    return await axios.post(API_URL + '/user/onboarding/start', null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
  } catch (error) {
    throw new Error('Error starting onboarding.');
  }
};

export const getOnboardingStatus = async (): Promise<{ step: string }> => {
  try {
    return (
      await axios.get(API_URL + '/user/onboarding', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
      })
    ).data;
  } catch (error) {
    throw new Error('Error getting onboarding status.');
  }
};

export const finishOnboarding = async () => {
  try {
    return await axios.post(API_URL + '/user/onboarding/finished', null, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
  } catch (error) {
    throw new Error('Error updating onboarding status.');
  }
};
