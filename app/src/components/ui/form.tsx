// src/components/ui/form.tsx
import * as React from 'react';
import { FormState } from '@/types/ui';
import { useCallback } from 'react';

interface FormProps {
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  children: React.ReactNode;
  initialValues?: Record<string, unknown>;
  validate?: (values: Record<string, unknown>) => Record<string, string>;
}

export function Form({ onSubmit, children, initialValues = {}, validate }: FormProps) {
  const [formState, setFormState] = React.useState<FormState>(() => ({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false
  }));

  const handleChange = (name: string, value: unknown) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      touched: { ...prev.touched, [name]: true }
    }));
  };

  const handleBlur = (name: string) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }));
  };

  const validateForm = useCallback(() => {
    if (validate) {
      const errors = validate(formState.values);
      setFormState(prev => ({
        ...prev,
        errors,
        isValid: Object.keys(errors).length === 0
      }));
    }
  }, [validate, formState.values]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    validateForm();
    
    if (Object.keys(formState.errors).length > 0) {
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await onSubmit(formState.values);
    } catch (error) {
      console.error('Form submission failed:', error);
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, __form: 'Submission failed' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  React.useEffect(() => {
    validateForm();
  }, [formState.values, validateForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            name: child.props.name,
            value: formState.values[child.props.name],
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => 
              handleChange(child.props.name, e.target.value),
            onBlur: () => handleBlur(child.props.name),
            error: formState.errors[child.props.name],
            touched: formState.touched[child.props.name],
            ...child.props
          });
        }
        return child;
      })}
    </form>
  );
}