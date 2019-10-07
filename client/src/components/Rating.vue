<template lang="html">
  <div class="rating">
    <h1>Рейтинг</h1>
    <div class="rating-content">
      <a href="">За все время</a>
      <br><br><div><a href="">За предыдущий месяц</a></div>
      <table>
        <thead>
          <tr>
            <td>
              Место
            </td>
            <td>
              Пользователь
            </td>
            <td>
              Количество выполненных заданий
            </td>
          </tr>
        </thead>
        <tr>
          <td>1</td>
          <td>Александр Ободов</td>
          <td>5</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Петр Иванов</td>
          <td>3</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Ксения Комарова</td>
          <td>2</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Алексей Якшин</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating'
}
</script>

<style lang="css" scoped>
.rating {
  width: 100%;
}
table {
  font-size: 0.8em;
  margin-top: 2em;
  border-collapse: separate;
  border-spacing: 1em 1em;
}
thead {
  font-size: 1rem;
}
a {
  text-decoration: none;
  color: inherit;
  border-bottom: 1px dashed #fff;
  width: 2em;
  text-align: center;
}
a:first-child {
  margin-right: 3em;
}
.rating-content {
  text-align: center;
}
@media screen and (min-width: 640px) {
  .rating {
    margin-top: 5em;
  }
  .rating h1 {
    text-align: left;
    font-size: 5em;
  }
  .rating p {
    font-size: 1.1em;
  }
  a {
    text-decoration: none;
    color: inherit;
    border-bottom: 1px dashed #fff;
    text-align: right;
  }
  a:first-child {
    margin-right: 2em;
  }
  a:hover {
    color: rgba(0,173,217,1);
    border-bottom: 1px dashed rgba(0,173,217,1);
  }
  table {
    margin-top: 2em;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1em;
  }
}

</style>
