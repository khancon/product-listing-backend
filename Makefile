build:
	docker build -t product-listing-backend .

run-no-mount:
	docker run -p 3000:3000 product-listing-backend

run:
	docker run -p 3000:3000 -v $$(pwd)/db.json:/app/db.json product-listing-backend

container-id:
	echo "Container running on $$(docker ps -q | head -n 1)"

restart: stop run

stop:
	@if [ -n "$$(docker ps -q | head -n 1)" ]; then \
		docker stop $$(docker ps -q | head -n 1); \
	else \
		echo "No running containers to stop."; \
	fi

logs:
	docker logs $$(docker ps -q | head -n 1)
