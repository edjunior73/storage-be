/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * files-storage
 * This API is for storing files for different users
 * OpenAPI spec version: 1.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  CreateUserDto,
  LoginDto,
  RefreshTokenDto,
  User,
  UserLogin
} from '.././model'



/**
 * Creates a new user and returns the created user. We don't have plans for now to implement this on frontend, but it's here for testing purposes
 * @summary Sign up route where a user is created
 */
export const createUser = (
    createUserDto: CreateUserDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    
    
    return axios.post(
      `/users`,
      createUserDto,options
    );
  }



export const getCreateUserMutationOptions = <TData = Awaited<ReturnType<typeof createUser>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: CreateUserDto}, TContext>, axios?: AxiosRequestConfig}
) => {
const mutationKey = ['createUser'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createUser>>, {data: CreateUserDto}> = (props) => {
          const {data} = props ?? {};

          return  createUser(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions } as UseMutationOptions<TData, TError,{data: CreateUserDto}, TContext>}

    export type CreateUserMutationResult = NonNullable<Awaited<ReturnType<typeof createUser>>>
    export type CreateUserMutationBody = CreateUserDto
    export type CreateUserMutationError = AxiosError<unknown>

    /**
 * @summary Sign up route where a user is created
 */
export const useCreateUser = <TData = Awaited<ReturnType<typeof createUser>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: CreateUserDto}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        TData,
        TError,
        {data: CreateUserDto},
        TContext
      > => {

      const mutationOptions = getCreateUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Receives user auth data, check the authentication and returns LoginData
 * @summary Sign in route for authentication
 */
export const login = (
    loginDto: LoginDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserLogin>> => {
    
    
    return axios.post(
      `/users/login`,
      loginDto,options
    );
  }



export const getLoginMutationOptions = <TData = Awaited<ReturnType<typeof login>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: LoginDto}, TContext>, axios?: AxiosRequestConfig}
) => {
const mutationKey = ['login'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof login>>, {data: LoginDto}> = (props) => {
          const {data} = props ?? {};

          return  login(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions } as UseMutationOptions<TData, TError,{data: LoginDto}, TContext>}

    export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>
    export type LoginMutationBody = LoginDto
    export type LoginMutationError = AxiosError<unknown>

    /**
 * @summary Sign in route for authentication
 */
export const useLogin = <TData = Awaited<ReturnType<typeof login>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: LoginDto}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        TData,
        TError,
        {data: LoginDto},
        TContext
      > => {

      const mutationOptions = getLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Receives the user refresh token, validates it and return an updated token
 * @summary Refreshes the user token
 */
export const refreshToken = (
    refreshTokenDto: RefreshTokenDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UserLogin>> => {
    
    
    return axios.post(
      `/users/refresh-token`,
      refreshTokenDto,options
    );
  }



export const getRefreshTokenMutationOptions = <TData = Awaited<ReturnType<typeof refreshToken>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: RefreshTokenDto}, TContext>, axios?: AxiosRequestConfig}
) => {
const mutationKey = ['refreshToken'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof refreshToken>>, {data: RefreshTokenDto}> = (props) => {
          const {data} = props ?? {};

          return  refreshToken(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions } as UseMutationOptions<TData, TError,{data: RefreshTokenDto}, TContext>}

    export type RefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof refreshToken>>>
    export type RefreshTokenMutationBody = RefreshTokenDto
    export type RefreshTokenMutationError = AxiosError<unknown>

    /**
 * @summary Refreshes the user token
 */
export const useRefreshToken = <TData = Awaited<ReturnType<typeof refreshToken>>, TError = AxiosError<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<TData, TError,{data: RefreshTokenDto}, TContext>, axios?: AxiosRequestConfig}
): UseMutationResult<
        TData,
        TError,
        {data: RefreshTokenDto},
        TContext
      > => {

      const mutationOptions = getRefreshTokenMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Returns the authenticated user data using the token as reference
 * @summary Get the authenticated user data
 */
export const me = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<User>> => {
    
    
    return axios.get(
      `/users/me`,options
    );
  }


export const getMeQueryKey = () => {
    return [`/users/me`] as const;
    }

    
export const getMeQueryOptions = <TData = Awaited<ReturnType<typeof me>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMeQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof me>>> = ({ signal }) => me({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData> & { queryKey: QueryKey }
}

export type MeQueryResult = NonNullable<Awaited<ReturnType<typeof me>>>
export type MeQueryError = AxiosError<unknown>


/**
 * @summary Get the authenticated user data
 */

export function useMe<TData = Awaited<ReturnType<typeof me>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof me>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMeQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Returns the authenticated user files URLs
 * @summary Get the authenticated user files URLs
 */
export const myFiles = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<string[]>> => {
    
    
    return axios.get(
      `/users/me/files`,options
    );
  }


export const getMyFilesQueryKey = () => {
    return [`/users/me/files`] as const;
    }

    
export const getMyFilesQueryOptions = <TData = Awaited<ReturnType<typeof myFiles>>, TError = AxiosError<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof myFiles>>, TError, TData>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMyFilesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof myFiles>>> = ({ signal }) => myFiles({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof myFiles>>, TError, TData> & { queryKey: QueryKey }
}

export type MyFilesQueryResult = NonNullable<Awaited<ReturnType<typeof myFiles>>>
export type MyFilesQueryError = AxiosError<unknown>


/**
 * @summary Get the authenticated user files URLs
 */

export function useMyFiles<TData = Awaited<ReturnType<typeof myFiles>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof myFiles>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getMyFilesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



