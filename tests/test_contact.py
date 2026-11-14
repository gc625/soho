"""Verify contact links on every public HTML page with a contact section."""
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class ContactLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.current = [dict(attrs).get('href', ''), '']

    def handle_data(self, data):
        if self.current is not None:
            self.current[1] += data

    def handle_endtag(self, tag):
        if tag == 'a' and self.current is not None:
            self.links.append(tuple(self.current))
            self.current = None


class TestContactInformation(unittest.TestCase):
    def test_contact_links_on_each_page(self):
        for page in ('index.html', 'media.html'):
            with self.subTest(page=page):
                parser = ContactLinks()
                parser.feed((ROOT / page).read_text(encoding='utf-8'))
                self.assertIn(('mailto:smartoplimited@gmail.com', 'smartoplimited@gmail.com'), parser.links)
                self.assertIn(('tel:+85260157050', '+852 6015 7050'), parser.links)

    def test_address_on_each_page(self):
        for page in ('index.html', 'media.html'):
            with self.subTest(page=page):
                text = (ROOT / page).read_text(encoding='utf-8')
                self.assertIn('Mee Lun Street, Sheung Wan, HK', text)
                self.assertNotIn('Tank Lane Shop House', text)


if __name__ == '__main__':
    unittest.main()
