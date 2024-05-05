from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def get_posts(self):
        self.client.get("/posts")

    @task
    def get_user(self):
        self.client.get("/users/1")

    @task
    def get_albums(self):
        self.client.get("/albums/1")

    @task
    def search_user(self):
        self.client.get("/search/Leanne Graham")

    @task
    def create_post(self):
        self.client.post("/posts", json={"content": "Test content", "author": "Test author"})
