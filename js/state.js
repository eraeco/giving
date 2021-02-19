// Donors
// 1. Apply as Donor
// 2. Browse Beneficiaries
// 3. Reveive Email Updates from Beneficiary
// 4. Send Message to Beneficiary
// 5. Donate to Beneficiary / TeamGiving

// Beneficiary
// 1. Apply as Beneficiary
//     - Need Survey
// 2. Receive Email Updates from Donors
// 3. Send Message to Donor

// Admin
// 1. Manage Donor Applications
// 2. Manage Beneficiary Applications
// 3. Approve Applications
// 4. Manage Donations

const { Machine, actions, interpret } = global.XState;

const emailMachine = Machine({
  id: "email",
  initial: "idle",
  states: {
    init: {},
    sending: {}
  }
});

// gundb magic
const authMachine = Machine({
  id: "auth"
});

// You can copy paste this into https://xstate.js.org/viz/
const appMachine = Machine({
  id: "app",
  initial: "init",
  states: {
    init: {
      invoke: {
        src: "loadCredentials",
        onDone: "authenticated",
        onError: "anonymous"
      }
    },
    anonymous: {
      initial: "welcome",
      states: {
        welcome: {},
        register: {}
      }
    },
    authenticated: {
      initial: "profile",
      states: {
        profile: {
          on: {
            APPLY: "apply",
            VIEW_APPLICATIONS: "applications",
            VIEW_BENFICARIES: "beneficiary",
            VIEW_DONARS: "donor"
          }
        },
        apply: {
          on: {
            SUBMIT_APPLICATION: "profile"
          }
        },
        applications: {
          initial: "list",
          on: {
            VIEW_PROFILE: "profile"
          },
          states: {
            list: {
              on: {
                SELECT_APPLICATION: "selected"
              }
            },
            selected: {
              invoke: {
                src: "loadApplication",
                onDone: {}
              },
              states: {
                pending: {},
                approved: {},
                complete: {},
                rejected: {}
              }
            }
          }
        },
        beneficiary: {
          initial: "list",
          on: {
            VIEW_PROFILE: "profile"
          },
          states: {
            list: {
              on: {
                SELECT_BENFICARY: "selected"
              }
            },
            selected: {
              initial: "init",
              states: {
                init: {
                  invoke: {
                    src: "isDonor",
                    onDone: "donor",
                    onError: "public"
                  }
                },
                public: {},
                donor: {}
              }
            }
          }
        },
        donor: {
          initial: "list",
          on: {
            VIEW_PROFILE: "profile"
          },
          states: {
            list: {
              on: {
                SELECT_DONAR: "selected"
              }
            },
            selected: {}
          }
        }
      }
    }
  }
});
