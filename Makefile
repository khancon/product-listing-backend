build:
	docker build -t product-listing-backend .

run:
	docker run -p 3000:3000 -v $$(pwd)/db.sqlite:/app/db.sqlite product-listing-backend

run-no-mount:
	docker run -p 3000:3000 product-listing-backend

container-id:
	echo "Container running on $$(docker ps -q | head -n 1)"

restart: stop build run

stop-first:
	@if [ -n "$$(docker ps -q | head -n 1)" ]; then \
		docker stop $$(docker ps -q | head -n 1); \
	else \
		echo "No running containers to stop."; \
	fi

stop:
	@if [ -n "$$(docker ps -q --filter "ancestor=product-listing-backend")" ]; then \
		docker stop $$(docker ps -q --filter "ancestor=product-listing-backend"); \
	else \
		echo "No running containers with filter 'product-listing-backend' to stop."; \
	fi

logs:
	docker logs $$(docker ps -q | head -n 1)
