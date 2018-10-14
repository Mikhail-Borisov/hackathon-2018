import pymorphy2
import re
from nltk.tokenize import casual_tokenize
from flask import Flask, request, make_response, jsonify

morph = pymorphy2.MorphAnalyzer()
word_regex = r'\w+'


def is_word(word):
    return re.match(word_regex, word) is not None


def lemmatize_word(word):
    return morph.parse(word)[0].normal_form


def lemmatize_text(text):
    words_and_punkt = casual_tokenize(text)
    words = list(filter(is_word, words_and_punkt))
    return list(map(lemmatize_word, words))


def tag_present(lemmatized_text, tag):
    words_set = set(lemmatized_text)
    lemmatized_tag = lemmatize_text(tag)
    tag_words_set = set(lemmatized_tag)
    return tag_words_set.issubset(words_set)


def tags_present(text, tags):
    lemmatized_text = lemmatize_text(text)
    return list(filter(lambda tag: tag_present(lemmatized_text, tag), tags))


# text = 'Я всю свою ебаную жизнь работаю краснодеревщиком. Сделал тысячи столов и занимался резьбой по дереву'
# tags = ['краснодеревщик', 'менеджер', 'программист', 'резьба по дереву']
#
# print(tags_present(text, tags))
#
app = Flask(__name__)


@app.route('/', methods=['POST'])
def return_tags():
    data = request.get_json()
    text = data['text']
    tags = data['tags']
    present_tags = tags_present(text, tags)
    response = {
        "tags": present_tags
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
