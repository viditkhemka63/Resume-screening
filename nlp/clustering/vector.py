
import tornado.ioloop
import tornado.web
import json

# import tensorflow as tf
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import tensorflow_hub as hub

module_url = "./2/" #@param ["https://tfhub.dev/google/universal-sentence-encoder/2", "https://tfhub.dev/google/universal-sentence-encoder-large/3"]
embed_fn = None

def loadModel():
    global embed_fn
    embed_fn = embed_useT(module_url)
    print('rule engine loaded')

def embed_useT(module):
    with tf.Graph().as_default():
        sentences = tf.placeholder(tf.string)
        embed = hub.Module(module)
        embeddings = embed(tf.squeeze(tf.cast(sentences, tf.string)), 	signature="default", as_dict=True )["default"]
        session = tf.train.MonitoredSession()
    return lambda x: session.run(embeddings, {sentences: x})

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")
    def post(self):
        data = self.request.body    
        data = json.loads(data.decode('utf-8'))
        print( data['sentences'])
        global embed_fn
        parsedSentence = embed_fn(['test'] + data['sentences'])
        vector = {'vector': parsedSentence.tolist()[1:]}
        self.write(vector)


application = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    loadModel()
    application.listen(5010)
    tornado.ioloop.IOLoop.instance().start()
    
 