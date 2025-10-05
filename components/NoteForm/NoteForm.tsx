'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  tag: Yup.string().required('Tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values);
        setSubmitting(false);
      }}
    >
      <Form className={styles.form}>
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" component="div" className={styles.error} />

        <label htmlFor="content">Content</label>
        <Field name="content" as="textarea" />
        <ErrorMessage name="content" component="div" className={styles.error} />

        <label htmlFor="tag">Tag</label>
        <Field name="tag" type="text" />
        <ErrorMessage name="tag" component="div" className={styles.error} />

        <div className={styles.buttons}>
          <button type="submit">Create Note</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}