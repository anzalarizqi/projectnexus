// English — secondary language for NEXUS
// Used when system language is not Indonesian.

const en = {
  onboarding: {
    pin: {
      title: 'Enter PIN',
      placeholder: 'PIN',
      wrongPin: 'Wrong PIN. Try again.',
    },
    tou: {
      title: 'NEXUS TERMS OF USE',
      body: `NEXUS is a communication tool designed for lawful, peaceful civic coordination, including demonstrations, social actions, and community organising under Indonesian law.

PROHIBITED USES:

You MAY NOT use NEXUS to:

1. Plan, coordinate, or facilitate any criminal activity, including:
   - Violence against people or property
   - Fraud, theft, or economic crimes
   - Terrorism or violent extremism
   - Drug or weapons trafficking
   - Organised crime

2. Distribute content illegal under Indonesian law

3. Violate others' privacy or rights

DISCLAIMER:
The NEXUS developer is not responsible for how you use this app. You are solely responsible for compliance with all applicable laws.

By tapping "I Accept" you confirm:
✓ You have read and understood these terms
✓ You will use NEXUS only for lawful purposes`,
      accept: 'I ACCEPT',
      reject: 'I DISAGREE — EXIT',
    },
    pseudonym: {
      title: 'Choose a Pseudonym',
      subtitle: 'Other coordinators will see this name. Do not use your real name.',
      placeholder: 'Pseudonym',
      suggest: 'Suggest another',
      confirm: 'Use This Name',
    },
    qr: {
      title: 'Scan QR Code',
      subtitle: 'Ask the Action Leader to show the join QR code.',
      scanning: 'Scanning...',
      success: 'Joined successfully!',
      error: 'Invalid code. Try again.',
    },
  },

  statusBar: {
    inet: 'INET',
    bt: 'BT',
    sms: 'SMS',
    unreachable: 'UNREACHABLE',
    nodes: 'nodes',
  },

  channels: {
    title: 'Channels',
    semua: '#all',
    noMessages: 'No messages yet.',
  },

  chat: {
    inputPlaceholder: 'Type a message...',
    send: 'Send',
    status: {
      sent: 'Sent',
      delivered: 'Delivered',
      read: 'Read',
    },
  },

  smsWarning: {
    title: '⚠️ WARNING: SMS LAYER ACTIVE',
    body: `Although your message content is encrypted, SMS METADATA is visible to your cellular provider and can be accessed by authorities:

• WHO is sending (your phone number)
• WHO you are sending to (recipient number)
• WHEN the message was sent (timestamp)
• YOUR approximate location (via cell tower)

Use pseudonyms, not real names.
Avoid mentioning specific locations or identities.

Do you want to continue using SMS?`,
    confirm: 'I UNDERSTAND THE RISK',
    cancel: 'NO, DISABLE SMS',
    activeBanner: '⚠️ SMS ACTIVE — Metadata visible to carrier',
  },

  battery: {
    lowWarning: 'Low battery — enable battery saver?',
    criticalWarning: 'WARNING: Critical battery — find a power source',
    saverActive: 'Battery Saver Active — Mesh is slower',
    enableSaver: 'Enable Battery Saver',
    disableSaver: 'Disable Battery Saver',
  },

  emergency: {
    sos: {
      button: 'SOS',
      holdInstruction: 'Hold 2 seconds to send emergency',
      sending: 'Sending emergency...',
      sent: 'Emergency signal sent',
    },
    arrest: {
      button: 'Report Arrest',
      sent: 'Legal observers notified',
      lawyerSent: 'Lawyer dispatched — est.',
      minutes: 'minutes',
    },
    panicWipe: {
      wiping: 'Wiping data...',
      done: 'Data wiped',
    },
  },

  map: {
    title: 'Map',
    shareLocation: 'Share Location Now',
    downloadMap: 'Download Operation Map',
    pinLabels: {
      rally: 'Rally Point',
      water: 'Water Station',
      policeLine: 'Police Line',
      exit: 'Exit Route',
      blocked: 'Blocked',
      medical: 'Medical',
    },
  },

  pressStatement: {
    title: 'Official Statement',
    readConfirm: 'Read & Confirm',
    confirmed: 'Confirmed',
    pending: 'Pending',
    pushToPress: 'Send to Journalists via SMS',
  },

  update: {
    critical: {
      title: 'Critical Security Update',
      body: 'An important security update is available. Please update immediately to protect your safety.',
      action: 'Update Now',
    },
    normal: {
      banner: 'New version available',
      action: 'Update',
    },
    checking: 'Checking for updates...',
    upToDate: 'App is up to date',
    downloading: 'Downloading update...',
    installing: 'Installing update...',
    checkManually: 'Check for Updates',
  },

  settings: {
    title: 'Settings',
    training: 'Training Module',
    simulator: 'Simulator Mode',
    checkUpdate: 'Check for Updates',
    downloadMap: 'Download Operation Map',
    safetyNumber: 'Verify Safety Number',
    batterySaver: 'Battery Saver Mode',
    about: 'About NEXUS',
  },

  general: {
    ok: 'OK',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Something went wrong. Try again.',
    offline: 'No connection',
  },
};

export default en;
