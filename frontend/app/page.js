
import CheckAPI from './testApiBe';

import LoginButton from '@/components/LoginButton';

export default function Home() {
  return (
    <> 
    
    <CheckAPI/> 
    <div className="p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <LoginButton />
    </div>

   


    
    </>
    
  );
}
