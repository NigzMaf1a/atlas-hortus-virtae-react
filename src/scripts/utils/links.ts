interface Link {
  login: string
  services: string
}

const backendUrl: Link = {
  login: "http://localhost:8080",
  services: "http://localhost:8081"
}

const liveBackendUrl: Link = {
  login: "http://localhost:8081",
  services: "http://localhost:8081"
}

const links: Record<string, Link> = {
  dev: backendUrl,
  prod: liveBackendUrl,
};

export function getBackendUrl(env: "dev" | "prod" = "dev", access: "login" | "services" = "login"): string {
  switch (env) {
    case 'prod':
      switch (access) {
        case 'login':
          return links["prod"].login
        case 'services':
        default:
          return links["prod"].services
      }
    case 'dev':
    default:
      switch (access) {
        case 'login':
          return links["dev"].login
        case 'services':
        default:
          return links["dev"].services
      }
  }
}

const liveLink: Record<string, string> = {
  devLogin: getBackendUrl('dev', 'login'),
  devServices: getBackendUrl('dev', 'services'),
  prodLogin: getBackendUrl('prod', 'login'),
  prodServices: getBackendUrl('prod', 'services'),
}

export default liveLink
