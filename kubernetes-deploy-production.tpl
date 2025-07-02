apiVersion: apps/v1
kind: Deployment
metadata:
  name: moj-frontend-${BRANCH}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: moj-frontend-${BRANCH}
  template:
    metadata:
      labels:
        app: moj-frontend-${BRANCH}
    spec:
      containers:
      - name: moj-frontend
        image: ${REGISTRY}/${REPOSITORY}:${IMAGE_TAG}
        ports:
        - containerPort: 3000
      - name: express-app
        image: ${REGISTRY}/${REPOSITORY}:express-${IMAGE_TAG}
        env:
          - name: GITHUB_API_URL
            valueFrom:
              secretKeyRef:
                name: github-api-url
                key: github-api-url
          - name: GITHUB_API_TOKEN
            valueFrom:
              secretKeyRef:
                name: github-api-token
                key: github-api-token
          - name: GITHUB_REPO_OWNER
            valueFrom:
              secretKeyRef:
                name: github-repo-owner
                key: github-repo-owner
          - name: GITHUB_REPO_NAME
            valueFrom:
              secretKeyRef:
                name: github-repo-name
                key: github-repo-name
          - name: NOTIFY_PR_TEMPLATE
            valueFrom:
              secretKeyRef:
                name: notify-pr-template
                key: notify-pr-template
          - name: NOTIFY_SUBMISSION_TEMPLATE
            valueFrom:
              secretKeyRef:
                name: notify-submission-template
                key: notify-submission-template
          - name: NOTIFY_VERIFICATION_TEMPLATE
            valueFrom:
              secretKeyRef:
                name: notify-verification-template
                key: notify-verification-template
          - name: NOTIFY_EMAIL
            valueFrom:
              secretKeyRef:
                name: notify-email
                key: notify-email
          - name: NOTIFY_TOKEN
            valueFrom:
              secretKeyRef:
                name: notify-token
                key: notify-token
          - name: NOTIFY_EMAIL_RETRY_MS
            valueFrom:
              secretKeyRef:
                name: notify-email-retry-ms
                key: notify-email-retry-ms
          - name: NOTIFY_EMAIL_MAX_RETRIES
            valueFrom:
              secretKeyRef:
                name: notify-email-max-retries
                key: notify-email-max-retries
          - name: SENTRY_DSN
            valueFrom:
              secretKeyRef:
                name: sentry-dsn
                key: sentry-dsn
          - name: BRANCH
            value: ${BRANCH}
          - name: APP_URL
            value: https://design-patterns.service.justice.gov.uk          - name: REDIS_URL
            valueFrom:
              secretKeyRef:
                name: moj-frontend-ec-cluster-output
                key: primary_endpoint_address
          - name: REDIS_AUTH_TOKEN
            valueFrom:
              secretKeyRef:
                name: moj-frontend-ec-cluster-output
                key: auth_token
          - name: REDIS_TLS_ENABLED
            value: "true"
        ports:
        - containerPort: 3001
---
apiVersion: v1
kind: Service
metadata:
  name: express-app-${BRANCH}
  labels:
    app: express-app-${BRANCH}
spec:
  ports:
  - port: 3001
    name: express
    targetPort: 3001
  selector:
    app: moj-frontend-${BRANCH}
---
apiVersion: v1
kind: Service
metadata:
  name: moj-frontend-service-${BRANCH}
  labels:
    app: moj-frontend-service-${BRANCH}
spec:
  ports:
  - port: 3000
    name: http
    targetPort: 3000
  selector:
    app: moj-frontend-${BRANCH}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: moj-frontend-ingress-${BRANCH}
  annotations:
    external-dns.alpha.kubernetes.io/set-identifier: moj-frontend-ingress-${BRANCH}-${KUBE_NAMESPACE}-green
    external-dns.alpha.kubernetes.io/aws-weight: "100"
spec:
  ingressClassName: default
  tls:
  - hosts:
    - design-patterns.service.justice.gov.uk
    secretName: moj-frontend-prod-secret
  rules:
  - host: design-patterns.service.justice.gov.uk
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: moj-frontend-service-${BRANCH}
            port:
              number: 3000
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: moj-frontend-disruption-policy
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: moj-frontend-${BRANCH}

