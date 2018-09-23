start:
	cd backend && docker-compose up -d && docker-compose exec app rails db:create && docker-compose exec app rails db:migrate
	cd frontend && yarn && yarn start
