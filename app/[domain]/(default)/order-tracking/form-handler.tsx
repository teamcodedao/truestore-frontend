'use client';

import clsx from 'clsx';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import * as v from 'valibot';

import backdrop from '@ui/backdrop';

import {type FormValues, submit} from './submit.action';

export default function FormHandler() {
  const {register, handleSubmit, formState, setFocus} = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = values => {
    if (formState.isSubmitting || formState.isValidating) {
      return;
    }

    backdrop.show();
    setTimeout(async () => {
      try {
        await submit(values);
      } catch (error) {
        toast.error('Could not find order');
        setFocus('order_number');
      }

      backdrop.close();
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-6'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Email address
        </label>
        <div className='mt-2'>
          <input
            {...register('email', {
              validate(value) {
                try {
                  v.parse(
                    v.pipe(
                      v.string(),
                      v.nonEmpty('Please enter your email.'),
                      v.email('The email address is badly formatted.')
                    ),
                    value
                  );
                  return true;
                } catch (error) {
                  return error instanceof Error
                    ? error.message
                    : 'Invalid email';
                }
              },
            })}
            id='email'
            type='email'
            autoComplete='email'
            placeholder='name@domain.com'
            className={clsx(
              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6',
              {
                'focus:!ring-red-600': formState.errors.email,
              }
            )}
          />
          <p className='text-sm text-red-500'>
            {formState.errors.email?.message}
          </p>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='order-number'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Order Number
          </label>
        </div>
        <div className='mt-2'>
          <input
            {...register('order_number', {
              validate(value) {
                try {
                  v.parse(
                    v.pipe(
                      v.string(),
                      v.nonEmpty('Please enter a order number'),
                      v.minLength(4, 'Please enter a valid order number'),
                      v.regex(/\d+/, 'Please enter a valid order number')
                    ),
                    value
                  );
                  return true;
                } catch (error) {
                  return error instanceof Error
                    ? error.message
                    : 'Invalid order number';
                }
              },
            })}
            id='order-number'
            type='text'
            placeholder='54321'
            className={clsx(
              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6',
              {
                'focus:!ring-red-600': formState.errors.order_number,
              }
            )}
          />
          <p className='text-sm text-red-500'>
            {formState.errors['order_number']?.message}
          </p>
        </div>
      </div>

      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
        >
          Track it now
        </button>
      </div>
    </form>
  );
}
