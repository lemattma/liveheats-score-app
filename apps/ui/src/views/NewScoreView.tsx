import { FormProvider, useForm } from 'react-hook-form';
import { Score, ScoreStatus } from '../types/scores';

import Input from '../components/Input';
import { saveScore } from '../data/api';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const NUM_STEPS = 2;

function NewScoreView() {
  const navigate = useNavigate();

  const [numberOfParticipants, setNumberOfParticipants] = useState(2);
  const [score, setScore] = useState<Partial<Score>>({});
  const [step, setStep] = useState(1);

  const form = useForm<Score>({
    mode: 'onBlur',
    defaultValues: { ...score },
  });

  const addParticipant = () => {
    setNumberOfParticipants(numberOfParticipants + 1);
  };

  const cancel = () => {
    navigate('/scores');
  };

  const onSubmit = (data: Score) => {
    setScore({ ...data });

    if (step === NUM_STEPS) {
      saveScore({ ...data, status: ScoreStatus.UPCOMING } as Score);
      navigate('/scores');
      return;
    }

    setStep(step + 1);
  };

  return (
    <div className="sm:w-2/4 mx-auto">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <h1 className="text-3xl font-semibold mb-6 text-center">
                What's the race name?
              </h1>

              <Input
                name="title"
                autoFocus
                registerOptions={{ required: 'Enter a valid title' }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-semibold mb-6 text-center">
                Race participants
                <span className="block text-black/60 text-sm font-normal">
                  Add at least 2 participants
                </span>
              </h1>

              <div className="flex flex-col gap-3">
                {Array.from({ length: numberOfParticipants }).map(
                  (_p, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                      <span className="font-semibold">Lane {index + 1}</span>
                      <span className="grow">
                        <Input
                          name={`participants[${index}].name`}
                          registerOptions={{
                            required: 'Enter name',
                            minLength: {
                              value: 1,
                              message: 'Enter valid name',
                            },
                          }}
                        />
                      </span>
                    </div>
                  )
                )}

                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-link p-0 border-none"
                    onClick={addParticipant}
                  >
                    Add participant
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="divider" />

          <div className="flex items-center mt-6">
            <div>
              <button
                type="button"
                className="btn btn-sm btn-link p-0 border-none text-black/60"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
            <div className="grow justify-end flex gap-1">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-md btn-outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}

              {step <= NUM_STEPS && (
                <button className="btn btn-md btn-primary">
                  {step === NUM_STEPS ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default NewScoreView;
