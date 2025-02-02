import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

import _ from 'lodash';
import clsx from 'clsx';
import { twMerge } from 'tw-merge';

type InputProps = {
  name: string;
  registerOptions?: RegisterOptions<FieldValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  type = 'text',
  className,
  registerOptions,
  name,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = _.get(errors, name)?.message?.toString();

  return (
    <div className="flex flex-col gap-1">
      <input
        {...{
          ...register(name, registerOptions),
          type,
          className: twMerge(
            clsx(
              'input input-bordered w-full',
              fieldError && 'input-error',
              className
            )
          ),
          ...props,
        }}
      />

      {fieldError && <span className="text-error text-sm">{fieldError}</span>}
    </div>
  );
}

export default Input;
