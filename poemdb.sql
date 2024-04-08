-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 08 2024 г., 05:13
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `poemdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `nickname` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `regdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`nickname`, `mail`, `password`, `regdate`) VALUES
('Ink', 'narazakk@yandex.ru', 'Kiber_123', '0000-00-00'),
('Inks', 'hello@gmail.com', 'Kiber_123', '0000-00-00'),
('no_way', 'l@g.ru', 'heck', '2024-04-06');

-- --------------------------------------------------------

--
-- Структура таблицы `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `prodid` int(11) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `grade` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `feedback`
--

INSERT INTO `feedback` (`id`, `prodid`, `nickname`, `grade`, `comment`, `date`) VALUES
(3, 8, 'Ink', 5, 'Отлично! Браво!', '2024-04-08'),
(4, 7, 'Ink', 4, 'Замечательно!', '2024-04-08'),
(5, 8, 'Inks', 4, 'Не люблю Маяковского, но это классика!', '2024-04-08'),
(6, 9, 'Inks', 1, 'Ужасно! Тут даже нет текста!', '2024-04-08'),
(7, 10, 'Inks', 5, 'Браво!', '2024-04-08');

-- --------------------------------------------------------

--
-- Структура таблицы `prods`
--

CREATE TABLE `prods` (
  `id` int(11) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `tags` varchar(50) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `prods`
--

INSERT INTO `prods` (`id`, `nickname`, `name`, `date`, `tags`, `content`) VALUES
(7, 'no_way', 'ЗИМНЕЕ УТРО', '2024-04-08', 'классика, серебряный век', 'Мороз и солнце; день чудесный!\nЕще ты дремлешь, друг прелестный —\nПора, красавица, проснись:\nОткрой сомкнуты негой взоры\nНавстречу северной Авроры,\nЗвездою севера явись!\nВечор, ты помнишь, вьюга злилась,\nНа мутном небе мгла носилась;\nЛуна, как бледное пятно,\nСквозь тучи мрачные желтела,\nИ ты печальная сидела —\nА нынче... погляди в окно:\nПод голубыми небесами\nВеликолепными коврами,\nБлестя на солнце, снег лежит;\nПрозрачный лес один чернеет,\nИ ель сквозь иней зеленеет,\nИ речка подо льдом блестит.\nВся комната янтарным блеском\nОзарена. Веселым треском\nТрещит затопленная печь.\nПриятно думать у лежанки.\nНо знаешь: не велеть ли в санки\nКобылку бурую запречь?\nСкользя по утреннему снегу,\nДруг милый, предадимся бегу\nНетерпеливого коня\nИ навестим поля пустые,\nЛеса, недавно столь густые,\nИ берег, милый для меня.'),
(8, 'Ink', 'Лиличка!', '2024-04-08', 'классика, тоска, Маяковский', 'Вместо письма\nДым табачный воздух выел.\nКомната —\nглава в крученыховском аде.\nВспомни —\nза этим окном\nвпервые\nруки твои, исступленный, гладил.\nСегодня сидишь вот,\nсердце в железе.\nДень еще —\nвыгонишь,\nможет быть, изругав.\nВ мутной передней долго не влезет\nсломанная дрожью рука в рукав.\nВыбегу,\nтело в улицу брошу я.\nДикий,\nобезумлюсь,\nотчаяньем иссеча́сь.\nНе надо этого,\nдорогая,\nхорошая,\nдай простимся сейчас.\nВсе равно\nлюбовь моя —\nтяжкая гиря ведь —\nвисит на тебе,\nкуда ни бежала б.\nДай в последнем крике выреветь\nгоречь обиженных жалоб.\nЕсли быка трудом уморят —\nон уйдет,\nразляжется в холодных водах.\nКроме любви твоей,\nмне\nнету моря,\nа у любви твоей и плачем не вымолишь отдых.\nЗахочет покоя уставший слон —\nцарственный ляжет в опожаренном песке.\nКроме любви твоей,\nмне\nнету солнца,\nа я и не знаю, где ты и с кем.\nЕсли б так поэта измучила,\nон\nлюбимую на деньги б и славу выменял,\nа мне\nни один не радостен звон,\nкроме звона твоего любимого имени.\nИ в пролет не брошусь,\nи не выпью яда,\nи курок не смогу над виском нажать.\nНадо мною,\nкроме твоего взгляда,\nне властно лезвие ни одного ножа.\nЗавтра забудешь,\nчто тебя короновал,\nчто душу цветущую любовью выжег,\nи су́етных дней взметенный карнавал\nрастреплет страницы моих книжек…\nСлов моих сухие листья ли\nзаставят остановиться,\nжадно дыша?\nДай хоть\nпоследней нежностью выстелить\nтвой уходящий шаг.'),
(9, 'no_way', 'Странные мысли', '2024-04-08', 'набросок, неизбежность', 'Тут что-то будет'),
(10, 'Inks', 'Тёмная ночь', '2024-04-08', 'поэзия', 'Текст');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`nickname`);

--
-- Индексы таблицы `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `prods`
--
ALTER TABLE `prods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `prods`
--
ALTER TABLE `prods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
