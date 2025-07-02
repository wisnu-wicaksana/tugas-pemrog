// app/auth/callback/page.js
import { Suspense } from 'react';
import CallbackClient from '@/components/CallbackClient';

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackClient />
    </Suspense>
  );
}