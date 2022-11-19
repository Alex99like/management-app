import { IFormBoard } from './../../FormBoard/FormBoard';
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import { FieldError, UseFormGetValues } from 'react-hook-form';
import { TypeMaterialIconNameBS } from '../../../../utils/MaterialIcon';
import { IRegister } from '../form.interface';

export type IButton = ButtonHTMLAttributes<HTMLButtonElement>;
export type IClose = HTMLAttributes<HTMLDivElement>;

export interface IFieldProps {
  placeholder: string;
  icon: TypeMaterialIconNameBS;
  getValue?: { fn: UseFormGetValues<IRegister>; name: keyof IRegister };
  getValueBoard?: { fn: UseFormGetValues<IFormBoard>; name: keyof IFormBoard };
  error?: FieldError | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export type IField = TypeInputPropsField;
