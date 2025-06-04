uid := $(shell id -u)
gid := $(shell id -g)

make-model:
	docker-compose exec -u $(uid):$(gid) app php artisan make:model $(model) -m

make-controller:
	docker-compose exec -u $(uid):$(gid) app php artisan make:controller $(controller) -m

set-up_app:
	docker-compose -f docker-compose.yml up -d

set-up_jenkins:
	docker-compose -f docker-compose.jenkins.yaml up -d
