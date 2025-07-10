////////// gemini combined ///////////
'use client';

import { Category, createNote, NewNoteData } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/stores/noteStore';
import { useState } from 'react'; // Import useState for local error messages
import styles from './NoteForm.module.css'; // Assuming you have your CSS modules

type Props = {
  categories: Category[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for displaying error messages

  // Handles changes to input, textarea, and select elements, updating the draft store
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
    // Optional: console.log('Field changed:', event.target.name, event.target.value);
  };

  // useMutation hook for handling the API call to create a note
  const { mutate, isPending } = useMutation({
    mutationFn: createNote, // The API function to call
    onSuccess: () => {
      // console.log('Note created successfully! Clearing draft.'); // Optional log
      clearDraft(); // Clear the draft from the Zustand store
      setErrorMessage(null); // Clear any previous error messages
      router.push('/notes/filter/all'); // Redirect to the "all notes" page
    },
    onError: (error) => {
      console.error('Error submitting note:', error); // Log the full error
      // Attempt to display a more specific error message from the backend if available
      let displayMessage = 'An unexpected error occurred. Please try again.';
      if (error instanceof Error) {
        const axiosError = error as any; // Cast to 'any' to access Axios-specific properties
        if (axiosError.response?.data?.message) {
          displayMessage = `Error: ${axiosError.response.data.message}`;
        } else if (axiosError.message === 'Network Error') {
          displayMessage =
            'Could not connect to the server. Please check your internet connection or try again later.';
        }
      }
      setErrorMessage(displayMessage); // Set the error message for display
    },
  });

  // Handles the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission and page reload
    setErrorMessage(null); // Clear any previous error messages before new submission

    // Extract form data
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData) as NewNoteData;

    // --- Client-side validation ---
    if (!values.title.trim()) {
      setErrorMessage('Please enter a title for your note.');
      return;
    }
    if (!values.content.trim()) {
      setErrorMessage('Please enter content for your note.');
      return;
    }
    if (!values.categoryId) {
      // Check if a category was selected
      setErrorMessage('Please select a category.');
      return;
    }
    // --- End client-side validation ---

    mutate(values); // Trigger the API mutation
  };

  // Handles the cancel button click
  const handleCancel = () => {
    // console.log('Cancelled, navigating to /notes/filter/all'); // Optional log
    setErrorMessage(null); // Clear any error messages on cancel
    router.push('/notes/filter/all'); // Redirect to the "all notes" page
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Display error message if present */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <label className={styles.label}>
        Title
        <input
          type="text"
          name="title"
          defaultValue={draft?.title || ''} // Uses draft for persistence
          onChange={handleChange} // Updates draft on change
          className={styles.input}
          required // HTML5 validation for mandatory field
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          name="content"
          defaultValue={draft?.content || ''} // Uses draft for persistence
          onChange={handleChange} // Updates draft on change
          className={styles.textarea}
          required // HTML5 validation for mandatory field
        ></textarea>
      </label>

      <label className={styles.label}>
        Category
        <select
          name="categoryId" // Correct name for backend mapping
          defaultValue={draft?.categoryId || ''} // Uses draft for persistence
          onChange={handleChange} // Updates draft on change
          className={styles.select}
          required // HTML5 validation for mandatory field
        >
          {/* Default, disabled, and hidden option for user to select from */}
          <option value="" disabled hidden>
            Select a Category...
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.button}
          disabled={isPending} // Disable button while API request is pending
        >
          {isPending ? 'Creating...' : 'Create'}{' '}
          {/* Change button text based on loading state */}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.button}
          disabled={isPending} // Optionally disable cancel button too
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
