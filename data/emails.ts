export type ReasonId =
  | 'Suspicious sender domain'
  | 'Urgency/threat'
  | 'Link mismatch'
  | 'Unexpected attachment'
  | 'Requests sensitive info'
  | 'Too good to be true'
  | 'Brand impersonation'
  | 'Weird formatting/language';

export type EmailScenario = {
  id: string;
  level: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  timestamp: string;
  bodyText: string;
  links: { label: string; displayUrl: string; actualUrl: string; isSuspicious: boolean }[];
  attachments: { filename: string; type: string; isSuspicious: boolean }[];
  badges: string[];
  truth: 'phish' | 'safe';
  bestReasons: ReasonId[];
  explanation: string;
  evidence: string[];
  rawHeaders: string;
};

export const reasonOptions: ReasonId[] = [
  'Suspicious sender domain','Urgency/threat','Link mismatch','Unexpected attachment','Requests sensitive info','Too good to be true','Brand impersonation','Weird formatting/language'
];

export const levelConfig: Record<number, { requireReason: boolean; emails: number }> = {
  1: { requireReason: false, emails: 6 },
  2: { requireReason: true, emails: 6 },
};

export const emails: EmailScenario[] = [
  { id:'l1-1', level:1, senderName:'IT Helpdesk', senderEmail:'it-support@company-it.net', subject:'Password expires in 30 minutes', preview:'Urgent: confirm credentials to avoid lockout', timestamp:'08:14', bodyText:'Your password will expire in 30 minutes. Please verify your account immediately via the secure portal.', links:[{label:'Secure Portal', displayUrl:'https://login.company.com', actualUrl:'https://companny-secure-login.ru/reset', isSuspicious:true}], attachments:[], badges:['Urgent','External'], truth:'phish', bestReasons:['Link mismatch','Urgency/threat','Suspicious sender domain'], explanation:'The sender domain is not your corporate domain and the real link is unrelated.', evidence:['Sender email uses company-it.net instead of company.com','Hover URL points to a suspicious .ru domain'], rawHeaders:'Return-Path: <reset@company-it.net>\nReceived: from 182.77.1.4\nSPF: fail' },
  { id:'l1-2', level:1, senderName:'HR Team', senderEmail:'hr@company.com', subject:'Open enrollment reminder', preview:'Benefits enrollment closes Friday.', timestamp:'09:10', bodyText:'Reminder that benefits open enrollment closes Friday. Review plans in the HR portal.', links:[{label:'HR Portal', displayUrl:'https://hr.company.com', actualUrl:'https://hr.company.com', isSuspicious:false}], attachments:[{filename:'Benefits2026.pdf',type:'pdf',isSuspicious:false}], badges:['Attachment'], truth:'safe', bestReasons:[], explanation:'This is a normal internal HR reminder with legitimate links.', evidence:['Sender domain is legitimate','Link destination matches display URL'], rawHeaders:'Return-Path: <hr@company.com>\nReceived: from mail.company.com\nSPF: pass' },
  { id:'l1-3', level:1, senderName:'PayPal Security', senderEmail:'service@paypal-alerts.com', subject:'Unusual sign-in attempt detected', preview:'Confirm your account to avoid suspension', timestamp:'10:02', bodyText:'We detected unusual activity on your account. Confirm your identity now.', links:[{label:'paypal.com/security',displayUrl:'https://paypal.com/security',actualUrl:'https://paypal.verify-center.info',isSuspicious:true}], attachments:[], badges:['External','Urgent'], truth:'phish', bestReasons:['Brand impersonation','Link mismatch'], explanation:'The sender impersonates PayPal and the URL does not match official PayPal domains.', evidence:['Brand impersonation in sender name','Actual URL is verify-center.info'], rawHeaders:'Return-Path: <service@paypal-alerts.com>\nDKIM: none\nSPF: softfail' },
  { id:'l1-4', level:1, senderName:'Design Ops', senderEmail:'design.ops@company.com', subject:'Updated icon pack', preview:'Attaching approved icon set for Q1', timestamp:'11:22', bodyText:'Please use the attached icon set for the launch campaign.', links:[], attachments:[{filename:'Q1-icons.zip',type:'zip',isSuspicious:false}], badges:['Attachment'], truth:'safe', bestReasons:[], explanation:'Expected internal team communication with no suspicious asks.', evidence:['Internal sender address','Message context aligns with team work'], rawHeaders:'Return-Path: <design.ops@company.com>\nSPF: pass' },
  { id:'l1-5', level:1, senderName:'Finance Dept', senderEmail:'finance@companny.com', subject:'Invoice correction needed', preview:'Open attachment and update banking details', timestamp:'13:05', bodyText:'Please see attached corrected invoice and update payment details today.', links:[], attachments:[{filename:'invoice_correction.xlsm',type:'xlsm',isSuspicious:true}], badges:['External','Attachment'], truth:'phish', bestReasons:['Unexpected attachment','Suspicious sender domain'], explanation:'Lookalike sender domain and macro-enabled spreadsheet are major red flags.', evidence:['Sender uses companny.com typo domain','Attachment is .xlsm (macro-enabled)'], rawHeaders:'Return-Path: <finance@companny.com>\nSPF: fail' },
  { id:'l1-6', level:1, senderName:'Calendar Bot', senderEmail:'calendar@company.com', subject:'Meeting moved to 3:30 PM', preview:'Weekly standup shifted by 30 mins.', timestamp:'14:42', bodyText:'The weekly standup has been moved to 3:30 PM. Calendar invite updated.', links:[], attachments:[], badges:[], truth:'safe', bestReasons:[], explanation:'No suspicious indicators and sender is legitimate.', evidence:['No urgent threats or requests','Trusted internal sender'], rawHeaders:'Return-Path: <calendar@company.com>\nSPF: pass' }
];
