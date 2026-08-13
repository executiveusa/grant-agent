# Repository Lock

Canonical build repository: **https://github.com/executiveusa/grant-agent**

All product code, ICM contracts, design decisions, source adapters, evaluations, deployment manifests, and go-to-market documentation for Grant Agent belong here unless an explicit architecture decision says otherwise.

Reference/upstream systems are not alternative product repos. They are inputs:

- `executiveusa/pauli-hermes-agent` - agent runtime/upstream-compatible orchestration base
- `executiveusa/pauli-agent-S-computer-use-` - computer-use execution layer
- `executiveusa/pauli-remote-screen-` - human takeover research; AGPL boundary requires review
- `openprose/grant-finder` - deterministic, source-cited public grant discovery
- `weecology/ogrants` - grant metadata + licensed proposal exemplars
- `nayafia/microgrants` - CC0 microgrant source seed
- `deacs11/CrewAI_Grant_Funding_Opportunity_Finder_-_Eligibility_Checker_Crew` - workflow reference only unless licensing changes
- `standardagents/arrow-js` - agent-native UI/sandbox experiment, not a mandatory frontend dependency
- `justin-schroeder/*` - research/reference surface; concrete adoption requires a named repo and license review
- QVAC - local-first/private inference option
- Context Ontology Accelerator - semantic-context and delegated-access architecture reference

Do not create a second Grant Agent product repository without owner approval.