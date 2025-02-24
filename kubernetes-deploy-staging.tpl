apiVersion: apps/v1
kind: Deployment
metadata:
  name: moj-prototype-${BRANCH}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prototype-${BRANCH}
  template:
    metadata:
      labels:
        app: prototype-${BRANCH}
    spec:
      containers:
      - name: prototype
        image: ${REGISTRY}/${REPOSITORY}:${IMAGE_TAG}
        env:
          - name: USERNAME
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: username
          - name: PASSWORD
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: password
          - name: BRANCH
            value: ${BRANCH}
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
          - name: BRANCH
            value: ${BRANCH}
          - name: REDIS_URL
            valueFrom:
              secretKeyRef:
                name: prototype-ec-cluster-output
                key: primary_endpoint_address
          - name: REDIS_AUTH_TOKEN
            valueFrom:
              secretKeyRef:
                name: prototype-ec-cluster-output
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
    app: prototype-${BRANCH}
---
apiVersion: v1
kind: Service
metadata:
  name: prototype-service-${BRANCH}
  labels:
    app: prototype-service-${BRANCH}
spec:
  ports:
  - port: 3000
    name: http
    targetPort: 3000
  selector:
    app: prototype-${BRANCH}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: prototype-ingress-${BRANCH}
  annotations:
    external-dns.alpha.kubernetes.io/set-identifier: prototype-ingress-${BRANCH}-${KUBE_NAMESPACE}-green
    external-dns.alpha.kubernetes.io/aws-weight: "100"
spec:
  ingressClassName: default
  tls:
  - hosts:
    - ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
  rules:
  - host: ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: prototype-service-${BRANCH}
            port:
              number: 3000