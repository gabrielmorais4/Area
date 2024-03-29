import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  FormField,
  Input,
  useToast,
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  DialogHeader,
} from '@/components/ui';
import React, { memo, useCallback, useState } from 'react';
import { FormContainer, Modal } from './CreateEventModal.style';
import { EventInteraction, Trigger } from '@/api/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '@/api/events';
import { SetTriggerModal } from '../SetTriggerModal';
import { SetActionModal } from '../SetActionModal';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export type CreateEventModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
});

const CreateEventModalComponent: React.FC<CreateEventModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  });
  type FormValues = z.infer<typeof formSchema>;
  const [state, setState] = useState<number>(1);
  const [trigger, setTrigger] = useState<Trigger>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onCreateTrigger = useCallback(
    (newTrigger: Trigger) => {
      setTrigger(newTrigger);
      setState(3);
    },
    [setTrigger, setState],
  );

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (res) => {
      toast({
        title: 'Bridge created',
        description: 'The bridge has been created',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onOpenChange(false);
      setState(1);
      router.push(`/bridge/${res.uuid}`);
    },
    onError: () => {
      toast({
        title: 'Bridge creation failed',
        description: 'The bridge could not be created',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = useCallback((values: FormValues) => {
    const { name, description } = values;
    setName(name);
    setDescription(description || '');
    setState(2);
  }, []);

  const handleEvent = useCallback(
    (action: EventInteraction) => {
      if (!trigger || !action) {
        return;
      }
      createEventMutation.mutate({
        name: name,
        description: description,
        trigger_provider: trigger.trigger_provider.toLowerCase(),
        triggerInteraction: trigger.triggerInteraction,
        response_provider: action.provider.toLowerCase(),
        responseInteraction: action,
      });
    },
    [trigger, createEventMutation, name, description],
  );

  const onCreateAction = useCallback(
    (newAction: EventInteraction) => {
      handleEvent(newAction);
    },
    [handleEvent],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Modal>
        {state === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Create a new bridge</DialogTitle>
              <DialogDescription>
                Let’s start to create a new bridge (* required)
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bridge name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Bridge name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bridge description</FormLabel>
                      <FormControl>
                        <Input placeholder="Bridge description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Continue</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </FormContainer>
            </Form>
          </>
        )}
        {state === 2 && <SetTriggerModal onConfirm={onCreateTrigger} />}
        {state === 3 && <SetActionModal onConfirm={onCreateAction} />}
      </Modal>
    </Dialog>
  );
};

export const CreateEventModal = memo(CreateEventModalComponent);
