import { createElement, ComponentType } from "react";
import { Resend } from 'resend';

interface SendEmailProps<T extends object = object> {
  email: string,
  subject: string,
  component: ComponentType<T>,
  props?: T
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail<T extends object = object>(props: SendEmailProps<T>) {
  try {
    const { email, subject, component, props: componentProps } = props;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: subject,
      react: createElement(component, componentProps as T)
    });

    if (error) throw error;

    return data;

  } catch (err) {
    console.log(err);
    throw err;
  }
}