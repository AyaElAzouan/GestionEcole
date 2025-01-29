export interface UserType {
    value: 'student' | 'professor';
    label: string;
  }
  
  export interface StudentLevel {
    value: 'AP1' | 'AP2' | 'GINF1' | 'GINF2';
    label: string;
  }
  
  export interface Professor {
    value: string;
    label: string;
  }