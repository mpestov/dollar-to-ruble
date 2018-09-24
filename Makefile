start:
	cd backend && docker-compose up -d && docker-compose exec app rails db:create && docker-compose exec app rails db:migrate
	cd frontend && cp .env.development.local.sample .env.development.local && yarn && yarn start
