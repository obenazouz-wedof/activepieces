import { t } from 'i18next';
import { Paperclip } from 'lucide-react';
import * as React from 'react';
import { useImperativeHandle } from 'react';

import { cn } from '@/lib/utils';

import { SelectUtilButton } from '../custom/select-util-button';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const inputClass =
  'flex-grow flex  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 box-border';
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFileName(file ? file.name : null);
      props.onChange?.(event);
    };

    useImperativeHandle(ref, () => inputRef.current!);
    const handleDivClick = () => {
      inputRef.current?.click();
    };

    return type === 'file' ? (
      <>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          {...props}
          onChange={handleFileChange}
        />
        <div
          onClick={handleDivClick}
          className={cn(inputClass, 'cursor-pointer', className)}
        >
          <div
            className={cn('grow shrink truncate flex items-center', {
              'text-muted-foreground': !fileName,
            })}
          >
            {fileName || t('Select a file')}
          </div>
          <SelectUtilButton
            tooltipText={t('Select a file')}
            Icon={Paperclip}
          ></SelectUtilButton>
        </div>
      </>
    ) : (
      <input
        type={type}
        className={cn(inputClass, className)}
        ref={inputRef}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
