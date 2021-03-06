// Generated by https://quicktype.io

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  userId?: number;
  groupId?: number;
  memberId?: number;
  disabled?: boolean;
  privileges?: string[];
  groupName?: string;
  firstName?: string;
  lastName?: string;
  mobilePhone?: string;
  clientLevelPrivileges?: string[];
  groupLevelPrivileges?: { [key: string]: string[] };
}
